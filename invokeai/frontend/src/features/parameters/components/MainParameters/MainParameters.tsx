import { Flex } from '@chakra-ui/react';
import { RootState } from 'app/store';
import { useAppSelector } from 'app/storeHooks';
import { useTranslation } from 'react-i18next';
import ParametersAccordion from '../ParametersAccordion';
import MainCFGScale from './MainCFGScale';
import MainHeight from './MainHeight';
import MainIterations from './MainIterations';
import MainSampler from './MainSampler';
import MainSteps from './MainSteps';
import MainWidth from './MainWidth';
import MainSwapDims from './MainSwapDims';
import SeedSettings from './Seed/SeedSettings';

export const inputWidth = 'auto';

export default function MainSettings() {
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
          <MainIterations />
          <MainSteps />
          <MainCFGScale />
          <MainWidth />
          <MainHeight />
          <MainSampler />
        </Flex>
      ) : (
        <Flex flexDirection="column" rowGap={1}>
          <Flex>
            <MainIterations />
            <MainSteps />
            <MainCFGScale />
          </Flex>
          <Flex marginTop={'0.5rem'}>
            <MainWidth />
            <MainSwapDims />
            <MainHeight />
            <MainSampler />
          </Flex>
          <Flex marginTop={'0.5rem'}>
            <SeedSettings />
          </Flex>
        </Flex>
      ),
    },
  };
  return <ParametersAccordion accordionInfo={accordionItems} />;
}
