import React, { useEffect, useRef } from "react";
import { Thumb } from "manifesto.js";
import { ViewingDirection } from "@iiif/vocabulary";
import { useInView } from "react-intersection-observer";
import cx from "classnames";

const ThumbImage = ({
  index,
  onClick,
  paged,
  selected,
  thumb,
  viewingDirection,
}: {
  index: number;
  onClick: (thumb: Thumb) => void;
  paged: boolean;
  selected: boolean;
  thumb: Thumb;
  viewingDirection: ViewingDirection;
}) => {
  const [ref, inView] = useInView({
    threshold: 0,
    rootMargin: "0px 0px 0px 0px",
    triggerOnce: true,
  });

  return (
    <a
      // id={`thumb-${index}`}
      onClick={() => onClick(thumb)}
      className={cx("thumb", {
        first: index === 0,
        placeholder: !thumb.uri,
        twoCol:
          paged &&
          (viewingDirection === ViewingDirection.LEFT_TO_RIGHT ||
            viewingDirection === ViewingDirection.RIGHT_TO_LEFT),
        oneCol: !paged,
        selected: selected,
      })}
      tabIndex={0}
    >
      <div
        ref={ref}
        className="wrap"
        style={{
          height: thumb.height + 8 + "px",
        }}
      >
        {inView && <img src={thumb.uri} alt={thumb.label} />}
      </div>
      <div className="info">
        {/* <span className="index">
          {thumb.index}
        </span> */}
        <span className="label" title={thumb.label}>
          {thumb.label}&nbsp;
        </span>
        {/* <span
          className="searchResults"
          title="{{:~searchResultsTitle()}}"
        >{`todo`}</span> */}
      </div>
    </a>
  );
};

const ThumbsViewReact = ({
  onClick,
  paged,
  selected,
  thumbs,
  viewingDirection,
}: {
  onClick: (thumb: Thumb) => void;
  paged: boolean;
  selected: number[];
  thumbs: Thumb[];
  viewingDirection: ViewingDirection;
}) => {
  useEffect(() => {
    const thumb = ref.current?.querySelector(`#thumb-${selected[0]}`);
    thumb?.scrollIntoView({
      behavior: "smooth",
      block: "nearest",
      inline: "start",
    });
  }, [selected]);

  function showSeparator(paged: boolean, index: number) {
    if (paged) {
      // if paged, show separator after every 2 thumbs
      return !((index - 1) % 2 === 0);
    }

    return true;
  }

  const ref = useRef<HTMLDivElement | null>(null);

  return (
    <div
      ref={ref}
      className={cx("thumbs", {
        "left-to-right": viewingDirection === ViewingDirection.LEFT_TO_RIGHT,
        "right-to-left": viewingDirection === ViewingDirection.RIGHT_TO_LEFT,
        paged: paged,
      })}
    >
      {thumbs.map((thumb, index) => (
        <span key={`thumb-${index}`} id={`thumb-${index}`}>
          <ThumbImage
            index={index}
            onClick={onClick}
            paged={paged}
            selected={selected.includes(index)}
            thumb={thumb}
            viewingDirection={viewingDirection}
          />
          {showSeparator(paged, index) && <div className="separator"></div>}
        </span>
      ))}
    </div>
  );
};

export default ThumbsViewReact;
