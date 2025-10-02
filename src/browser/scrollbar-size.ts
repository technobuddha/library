import { type ScrollbarSize } from './size.ts';

/**
 * Calculates the width and height of the browser's scrollbar.
 *
 * This function creates a temporary DOM element with scrollbars,
 * measures the difference between its offset and client dimensions,
 * and returns the scrollbar's width and height in pixels.
 *
 * @returns `scrollbarWidth` and `scrollbarHeight`.
 * @group DOM
 * @category Element
 */
export function scrollbarSize(): ScrollbarSize {
  const node = document.createElement('div');

  node.setAttribute(
    'style',
    'width: 100px; height: 100px; position: absolute; top: -1000000px; overflow: scroll;',
  );
  document.body.append(node);

  const scrollbarWidth = node.offsetWidth - node.clientWidth;
  const scrollbarHeight = node.offsetHeight - node.clientHeight;

  node.remove();

  return { scrollbarWidth, scrollbarHeight };
}
