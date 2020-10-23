/* Copyright 2020 The TensorFlow Authors. All Rights Reserved.

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
==============================================================================*/

import {DataSeriesMetadataMap, Dimension, Extent} from '../internal_types';
import {RendererType} from '../renderer/renderer_types';
import {ScaleType} from '../scale_types';

export {RendererType} from '../renderer/renderer_types';

export enum MainToGuestEvent {
  SERIES_DATA_UPDATE,
  SERIES_METADATA_CHANGED,
  SCALE_UPDATE,
  UPDATE_VIEW_BOX,
  INIT,
  RESIZE,
}

export interface InitMessage {
  type: MainToGuestEvent.INIT;
  canvas: OffscreenCanvas;
  devicePixelRatio: number;
  dim: Dimension;
  // Cannot support SVG in the offscreen.
  rendererType: RendererType.WEBGL;
  xScaleType: ScaleType;
  yScaleType: ScaleType;
}

export interface UpdateMessage {
  type: MainToGuestEvent.UPDATE_VIEW_BOX;
  extent: Extent;
}

export interface ResizeMessage {
  type: MainToGuestEvent.RESIZE;
  dim: Dimension;
}

export interface SeriesUpdateMessage {
  type: MainToGuestEvent.SERIES_DATA_UPDATE;
  idsAndLengths: Array<{
    id: string;
    length: number;
  }>;
  flattenedSeries: ArrayBufferLike;
}

export type SeriesMetadataMap = DataSeriesMetadataMap;

export interface SeriesMetadataChangedeMessage {
  type: MainToGuestEvent.SERIES_METADATA_CHANGED;
  metadata: SeriesMetadataMap;
}

export interface ScaleUpdateMessage {
  type: MainToGuestEvent.SCALE_UPDATE;
  axis: 'x' | 'y';
  scaleType: ScaleType;
}

export type MainToGuestMessage =
  | UpdateMessage
  | ResizeMessage
  | ScaleUpdateMessage
  | SeriesUpdateMessage
  | SeriesMetadataChangedeMessage;

export enum GuestToMainType {
  ON_REDRAW_END,
}

export interface RedrawEndMessage {
  type: GuestToMainType.ON_REDRAW_END;
}

export type GuestToMainMessage = RedrawEndMessage;
