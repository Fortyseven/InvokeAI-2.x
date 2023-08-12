/* eslint-disable react/jsx-key */
import { Flex } from '@chakra-ui/react';
import { RootState } from 'app/store';
import { useAppDispatch, useAppSelector } from 'app/storeHooks';
import IAIButton from 'common/components/IAIIconButton';
import { setHeight, setWidth } from 'features/parameters/store/generationSlice';
import { HEIGHTS } from 'app/constants';
import { activeTabNameSelector } from 'features/ui/store/uiSelectors';

const ASPECTS = [
  { ratio_w: 1, ratio_h: 1 },
  { ratio_w: 3, ratio_h: 2 },
  { ratio_w: 4, ratio_h: 3 },
  { ratio_w: 16, ratio_h: 9 },
  { ratio_w: 21, ratio_h: 9 },
];

export default function MainAspectBar() {
  const width = useAppSelector((state: RootState) => state.generation.width);
  // const height = useAppSelector((state: RootState) => state.generation.height);
  const activeTabName = useAppSelector(activeTabNameSelector);

  const dispatch = useAppDispatch();

  const onClick = function (ratio_w: number, ratio_h: number) {
    if (ratio_w == 1 && ratio_h == 1) {
      dispatch(setHeight(width));
      return;
    }

    let calculated_height: number = Math.round((width * ratio_h) / ratio_w);

    // find closest height
    if (!(calculated_height in HEIGHTS)) {
      calculated_height = HEIGHTS.reduce(function (prev, curr) {
        return Math.abs(curr - calculated_height) <
          Math.abs(prev - calculated_height)
          ? curr
          : prev;
      });
    }

    dispatch(setHeight(calculated_height));
  };

  return (
    <Flex gap={1}>
      {ASPECTS.map((aspect) => (
        <IAIButton
          onClick={() => onClick(aspect.ratio_w, aspect.ratio_h)}
          aria-label={`${aspect.ratio_w}:${aspect.ratio_h}`}
          size={'xs'}
          flex={1}
          isDisabled={activeTabName === 'unifiedCanvas'}
        >
          <>{`${aspect.ratio_w}:${aspect.ratio_h}`}</>
        </IAIButton>
      ))}
      <IAIButton
        size={'xs'}
        flex={1}
        isDisabled={activeTabName === 'unifiedCanvas'}
        tooltip="Reset to 768x768"
        aria-label="Reset to 768x768"
        onClick={() => {
          dispatch(setWidth(768));
          dispatch(setHeight(768));
        }}
      >
        <>Reset</>
      </IAIButton>
    </Flex>
  );
}
