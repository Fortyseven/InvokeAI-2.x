import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';
import * as InvokeAI from 'app/invokeai';
import { FACETOOL_TYPES } from 'app/constants';

export type UpscalingLevel = 2 | 4;

export type FacetoolType = (typeof FACETOOL_TYPES)[number];

export interface PostprocessingState {
  codeformerFidelity: number;
  facetoolStrength: number;
  facetoolType: FacetoolType;
  hiresFix: boolean;
  hiresStrength: number;
  shouldLoopback: boolean;
  shouldRunESRGAN: boolean;
  shouldRunFacetool: boolean;
  upscalingLevel: UpscalingLevel;
  upscalingDenoising: number;
  upscalingStrength: number;
}

const initialPostprocessingState: PostprocessingState = {
  codeformerFidelity: 0.75,
  facetoolStrength: 0.75,
  facetoolType: 'gfpgan',
  hiresFix: true,
  hiresStrength: 0.5,
  shouldLoopback: false,
  shouldRunESRGAN: false,
  shouldRunFacetool: false,
  upscalingLevel: 2,
  upscalingDenoising: 0.1,
  upscalingStrength: 0.6,
};

const initialState: PostprocessingState = initialPostprocessingState;

export const postprocessingSlice = createSlice({
  name: 'postprocessing',
  initialState,
  reducers: {
    setAllPostProcessingParameters: (
      state,
      action: PayloadAction<InvokeAI.Metadata>
    ) => {
      const { type, hires_fix } = action.payload.image;

      if (type === 'txt2img') {
        state.hiresFix = Boolean(hires_fix);
        // Strength of img2img used in hires_fix is not currently exposed in the Metadata for the final image.
      }
    },
    setFacetoolStrength: (state, action: PayloadAction<number>) => {
      state.facetoolStrength = action.payload;
    },
    setCodeformerFidelity: (state, action: PayloadAction<number>) => {
      state.codeformerFidelity = action.payload;
    },
    setUpscalingLevel: (state, action: PayloadAction<UpscalingLevel>) => {
      state.upscalingLevel = action.payload;
    },
    setUpscalingDenoising: (state, action: PayloadAction<number>) => {
      state.upscalingDenoising = action.payload;
    },
    setUpscalingStrength: (state, action: PayloadAction<number>) => {
      state.upscalingStrength = action.payload;
    },
    setHiresFix: (state, action: PayloadAction<boolean>) => {
      state.hiresFix = action.payload;
    },
    setHiresStrength: (state, action: PayloadAction<number>) => {
      state.hiresStrength = action.payload;
    },
    resetPostprocessingState: (state) => {
      return {
        ...state,
        ...initialPostprocessingState,
      };
    },
    setShouldRunFacetool: (state, action: PayloadAction<boolean>) => {
      state.shouldRunFacetool = action.payload;
    },
    setFacetoolType: (state, action: PayloadAction<FacetoolType>) => {
      state.facetoolType = action.payload;
    },
    setShouldRunESRGAN: (state, action: PayloadAction<boolean>) => {
      state.shouldRunESRGAN = action.payload;
    },
    setShouldLoopback: (state, action: PayloadAction<boolean>) => {
      state.shouldLoopback = action.payload;
    },
  },
});

export const {
  setAllPostProcessingParameters,
  resetPostprocessingState,
  setCodeformerFidelity,
  setFacetoolStrength,
  setFacetoolType,
  setHiresFix,
  setHiresStrength,
  setShouldLoopback,
  setShouldRunESRGAN,
  setShouldRunFacetool,
  setUpscalingLevel,
  setUpscalingDenoising,
  setUpscalingStrength,
} = postprocessingSlice.actions;

export default postprocessingSlice.reducer;
