import { ChangeEvent } from 'react';

import { RootState } from 'app/store';
import { useAppDispatch, useAppSelector } from 'app/storeHooks';
import { setShouldRandomizeSeed } from 'features/parameters/store/generationSlice';
import { useTranslation } from 'react-i18next';
import IAIIconButton from 'common/components/IAIIconButton';
import { FaLock, FaLockOpen } from 'react-icons/fa';

export default function RandomizeSeedBtn() {
  const dispatch = useAppDispatch();

  const shouldRandomizeSeed = useAppSelector(
    (state: RootState) => state.generation.shouldRandomizeSeed
  );

  const onClickToggleRandom = () => {
    dispatch(setShouldRandomizeSeed(!shouldRandomizeSeed));
  };

  return (
    <IAIIconButton
      onClick={onClickToggleRandom}
      icon={shouldRandomizeSeed ? <FaLockOpen /> : <FaLock />}
      style={{
        backgroundColor: shouldRandomizeSeed ? '' : 'var(--btn-delete-image)',
      }}
      height={'1.75rem'}
      aria-label={'Randomize seed'}
      tooltip="Randomize seed"
    />
  );
}
