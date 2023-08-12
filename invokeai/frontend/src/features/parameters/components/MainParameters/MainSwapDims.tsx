import { RootState } from 'app/store';
import { useAppDispatch, useAppSelector } from 'app/storeHooks';
import IAIIconButton from 'common/components/IAIIconButton';
import { setHeight, setWidth } from 'features/parameters/store/generationSlice';
import { FaExchangeAlt } from 'react-icons/fa';

export default function MainSwapDims() {
  const width = useAppSelector((state: RootState) => state.generation.width);
  const height = useAppSelector((state: RootState) => state.generation.height);

  const dispatch = useAppDispatch();

  const onClick = function () {
    dispatch(setWidth(height));
    dispatch(setHeight(width));
  };

  return (
    <IAIIconButton
      className="swap-axis-btn"
      onClick={onClick}
      icon={<FaExchangeAlt />}
      tooltip={'Swap With/Height Axis'}
      aria-label={'Swap With/Height Axis'}
    />
  );
}
