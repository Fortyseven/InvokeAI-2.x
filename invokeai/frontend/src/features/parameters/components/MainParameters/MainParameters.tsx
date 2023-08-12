import { Flex } from '@chakra-ui/react';
import { RootState } from 'app/store';
import { useAppSelector } from 'app/storeHooks';
import { useTranslation } from 'react-i18next';
import ParametersAccordion from '../ParametersAccordion';
import MainCFGScale from './MainCFGScale';
import MainHeight from './MainHeight';
import MainSampler from './MainSampler';
import MainSteps from './MainSteps';
import MainWidth from './MainWidth';
import MainSwapDims from './MainSwapDims';
import SeedSettings from './Seed/SeedSettings';
import MainAspectBar from './AspectBar/MainAspectBar';
import ImageToImageStrength from '../AdvancedParameters/ImageToImage/ImageToImageStrength';
import { activeTabNameSelector } from 'features/ui/store/uiSelectors';

export const inputWidth = 'auto';

export default function MainSettings() {
  const activeTabName = useAppSelector(activeTabNameSelector);
  const { t } = useTranslation();

  const shouldUseSliders = useAppSelector(
    (state: RootState) => state.ui.shouldUseSliders
  );

  const accordionItems = {
    main: {
      header: `${t('parameters.general')}`,
      feature: undefined,
      content: shouldUseSliders ? (
        <Flex flexDir="column" rowGap={2}>
          {/* <MainIterations /> */}
          <MainSteps />
          <MainCFGScale />
          <MainWidth />
          <MainHeight />
          <MainSampler />
        </Flex>
      ) : (
        <Flex flexDirection="column" rowGap={1}>
          <Flex>
            {/* <MainIterations /> */}
            <MainSampler />
            <MainSteps />
            <MainCFGScale />
          </Flex>
          <hr />
          <MainAspectBar />
          <Flex>
            <MainWidth />
            <MainSwapDims />
            <MainHeight />
          </Flex>
          <hr />
          <Flex>
            <SeedSettings />
          </Flex>
          {activeTabName !== 'txt2img' && (
            <>
              <hr />
              <ImageToImageStrength
                label={t('parameters.img2imgStrength')}
                styleClass="main-settings-block image-to-image-strength-main-option"
              />
            </>
          )}
        </Flex>
      ),
    },
  };
  return <ParametersAccordion accordionInfo={accordionItems} />;
}
