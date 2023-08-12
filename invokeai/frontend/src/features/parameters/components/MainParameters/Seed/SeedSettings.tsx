import { Flex } from '@chakra-ui/react';
// import Perlin from './Perlin';
// import Threshold from './Threshold';
import RandomizeSeedBtn from './RandomizeSeedBtn';
import Seed from './Seed';
import ShuffleSeed from './ShuffleSeed';

/**
 * Seed & variation options. Includes iteration, seed, seed randomization, variation options.
 */
const SeedSettings = () => {
  return (
    <Flex gap={2} direction="column">
      <Flex gap={2}>
        <Seed />
        <ShuffleSeed />
        <RandomizeSeedBtn />
      </Flex>
      {/* <Flex gap={2}>
        <Threshold />
      </Flex>
      <Flex gap={2}>
        <Perlin />
      </Flex> */}
    </Flex>
  );
};

export default SeedSettings;
