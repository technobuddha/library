/**
 * Represents the dimensions of a scrollbar.
 * @group DOM
 * @category Element
 */
export type ScrollbarSize = {
  /** The width of the scrollbar in pixels. */
  readonly scrollbarWidth: number;
  /** The height of the scrollbar in pixels. */
  readonly scrollbarHeight: number;
};

/**
 * Represents the size of an element, including its width, height, and scrollbar dimensions.
 *
 * Extends the `ScrollbarSize` type with additional width and height properties.
 * @group DOM
 * @category Element
 */
export type ElementSize = {
  /** The width of the element in pixels. */
  readonly width: number;
  /** The height of the element in pixels. */
  readonly height: number;
};
