import { Flex } from '@chakra-ui/react';
import { RootState } from 'app/store';
import { useAppDispatch, useAppSelector } from 'app/storeHooks';
import IAIButton from 'common/components/IAIIconButton';
import { setHeight, setWidth } from 'features/parameters/store/generationSlice';
import { FaExchangeAlt } from 'react-icons/fa';
import { HEIGHTS } from 'app/constants';
export default function MainSwapDims() {
  const width = useAppSelector((state: RootState) => state.generation.width);
  const height = useAppSelector((state: RootState) => state.generation.height);

  const dispatch = useAppDispatch();

  const onClick = function (ratio_w: number, ratio_h: number) {
    // dispatch(setWidth(height));
    // dispatch(setHeight(width));

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
    <Flex>
      <IAIButton
        onClick={() => onClick(1, 1)}
        tooltip={'1:1'}
        aria-label={'1:1'}
        size={'sm'}
        flex={1}
      >
        <>1:1</>
      </IAIButton>
      <IAIButton
        onClick={() => onClick(3, 2)}
        tooltip={'3:2'}
        aria-label={'3:2'}
        size={'sm'}
        flex={1}
      >
        <>3:2</>
      </IAIButton>
      <IAIButton
        onClick={() => onClick(4, 3)}
        tooltip={'4:3'}
        aria-label={'4:3'}
        size={'sm'}
        flex={1}
      >
        <>4:3</>
      </IAIButton>
      <IAIButton
        onClick={() => onClick(16, 9)}
        tooltip={'16:9'}
        aria-label={'16:9'}
        size={'sm'}
        flex={1}
      >
        <>16:9</>
      </IAIButton>
    </Flex>
  );
}
