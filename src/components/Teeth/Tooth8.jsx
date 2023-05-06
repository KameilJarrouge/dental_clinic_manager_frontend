import React from "react";
import ToothBadge from "./ToothBadge";

function Tooth8({
  className,
  rotation,
  selfRotate = false,
  children,
  badges = [1, 2],
  number,

  quarter,
  ...otherProps
}) {
  return (
    // <div className={`${className} relative group top-[73.39mm] left-[24.5mm]`}>
    //   <div className={`${selfRotate && rotation} absolute `} {...otherProps}>
    //     {" "}
    <svg
      version="1.2"
      width="13.72mm"
      height="13.72mm"
      viewBox="0 0 1372 1372"
      preserveAspectRatio="xMidYMid"
      fillRule="evenodd"
      strokeWidth="28.222"
      strokeLinejoin="round"
      xmlns="http://www.w3.org/2000/svg"
      xmlns:ooo="http://xml.openoffice.org/svg/export"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      xmlns:presentation="http://sun.com/xmlns/staroffice/presentation"
      xmlns:smil="http://www.w3.org/2001/SMIL20/"
      xmlns:anim="urn:oasis:names:tc:opendocument:xmlns:animation:1.0"
      xmlSpace="preserve"
    >
      <defs className="ClipPathGroup">
        <clipPath id="presentation_clip_path" clipPathUnits="userSpaceOnUse">
          <rect x="0" y="0" width="1372" height="1372" />
        </clipPath>
        <clipPath
          id="presentation_clip_path_shrink"
          clipPathUnits="userSpaceOnUse"
        >
          <rect x="1" y="1" width="1370" height="1370" />
        </clipPath>
      </defs>
      <defs className="TextShapeIndex">
        <g ooo:slide="id1" ooo:id-list="id3 id4 id5 id6 id7" />
      </defs>
      <defs className="EmbeddedBulletChars">
        <g
          id="bullet-char-template-57356"
          transform="scale(0.00048828125,-0.00048828125)"
        >
          <path d="M 580,1141 L 1163,571 580,0 -4,571 580,1141 Z" />
        </g>
        <g
          id="bullet-char-template-57354"
          transform="scale(0.00048828125,-0.00048828125)"
        >
          <path d="M 8,1128 L 1137,1128 1137,0 8,0 8,1128 Z" />
        </g>
        <g
          id="bullet-char-template-10146"
          transform="scale(0.00048828125,-0.00048828125)"
        >
          <path d="M 174,0 L 602,739 174,1481 1456,739 174,0 Z M 1358,739 L 309,1346 659,739 1358,739 Z" />
        </g>
        <g
          id="bullet-char-template-10132"
          transform="scale(0.00048828125,-0.00048828125)"
        >
          <path d="M 2015,739 L 1276,0 717,0 1260,543 174,543 174,936 1260,936 717,1481 1274,1481 2015,739 Z" />
        </g>
        <g
          id="bullet-char-template-10007"
          transform="scale(0.00048828125,-0.00048828125)"
        >
          <path d="M 0,-2 C -7,14 -16,27 -25,37 L 356,567 C 262,823 215,952 215,954 215,979 228,992 255,992 264,992 276,990 289,987 310,991 331,999 354,1012 L 381,999 492,748 772,1049 836,1024 860,1049 C 881,1039 901,1025 922,1006 886,937 835,863 770,784 769,783 710,716 594,584 L 774,223 C 774,196 753,168 711,139 L 727,119 C 717,90 699,76 672,76 641,76 570,178 457,381 L 164,-76 C 142,-110 111,-127 72,-127 30,-127 9,-110 8,-76 1,-67 -2,-52 -2,-32 -2,-23 -1,-13 0,-2 Z" />
        </g>
        <g
          id="bullet-char-template-10004"
          transform="scale(0.00048828125,-0.00048828125)"
        >
          <path d="M 285,-33 C 182,-33 111,30 74,156 52,228 41,333 41,471 41,549 55,616 82,672 116,743 169,778 240,778 293,778 328,747 346,684 L 369,508 C 377,444 397,411 428,410 L 1163,1116 C 1174,1127 1196,1133 1229,1133 1271,1133 1292,1118 1292,1087 L 1292,965 C 1292,929 1282,901 1262,881 L 442,47 C 390,-6 338,-33 285,-33 Z" />
        </g>
        <g
          id="bullet-char-template-9679"
          transform="scale(0.00048828125,-0.00048828125)"
        >
          <path d="M 813,0 C 632,0 489,54 383,161 276,268 223,411 223,592 223,773 276,916 383,1023 489,1130 632,1184 813,1184 992,1184 1136,1130 1245,1023 1353,916 1407,772 1407,592 1407,412 1353,268 1245,161 1136,54 992,0 813,0 Z" />
        </g>
        <g
          id="bullet-char-template-8226"
          transform="scale(0.00048828125,-0.00048828125)"
        >
          <path d="M 346,457 C 273,457 209,483 155,535 101,586 74,649 74,723 74,796 101,859 155,911 209,963 273,989 346,989 419,989 480,963 531,910 582,859 608,796 608,723 608,648 583,586 532,535 482,483 420,457 346,457 Z" />
        </g>
        <g
          id="bullet-char-template-8211"
          transform="scale(0.00048828125,-0.00048828125)"
        >
          <path d="M -4,459 L 1135,459 1135,606 -4,606 -4,459 Z" />
        </g>
        <g
          id="bullet-char-template-61548"
          transform="scale(0.00048828125,-0.00048828125)"
        >
          <path d="M 173,740 C 173,903 231,1043 346,1159 462,1274 601,1332 765,1332 928,1332 1067,1274 1183,1159 1299,1043 1357,903 1357,740 1357,577 1299,437 1183,322 1067,206 928,148 765,148 601,148 462,206 346,322 231,437 173,577 173,740 Z" />
        </g>
      </defs>
      <defs className="TextEmbeddedBitmaps" />
      <g>
        <g id="id2" className="Master_Slide">
          <g id="bg-id2" className="Background" />
          <g id="bo-id2" className="BackgroundObjects" />
        </g>
      </g>
      <g className="SlideGroup">
        <g>
          <g id="container-id1">
            <g
              id="id1"
              className="Slide"
              clipPath="url(#presentation_clip_path)"
            >
              <g className="Page">
                <g className="Group">
                  <g className="com.sun.star.drawing.ClosedBezierShape">
                    <g id="id3">
                      <rect
                        className="BoundingBox"
                        stroke="none"
                        fill="none"
                        x="51"
                        y="51"
                        width="1271"
                        height="1272"
                      />
                    </g>
                  </g>
                  <g className="com.sun.star.drawing.ClosedBezierShape">
                    <g id="id4">
                      <rect
                        className="BoundingBox"
                        stroke="none"
                        fill="none"
                        x="29"
                        y="29"
                        width="1315"
                        height="1315"
                      />
                      <path
                        fill="current"
                        stroke="current"
                        strokeWidth="43"
                        strokeLinejoin="round"
                        strokeLinecap="round"
                        d="M 819,53 C 254,20 -76,345 97,922 177,1188 441,1358 747,1314 1013,1275 1189,1144 1272,799 1348,475 1415,89 819,53 Z"
                      />
                    </g>
                  </g>
                  <g className="com.sun.star.drawing.ClosedBezierShape">
                    <g id="id5">
                      <rect
                        className="BoundingBox"
                        stroke="none"
                        fill="none"
                        x="476"
                        y="160"
                        width="651"
                        height="1000"
                      />
                    </g>
                  </g>
                  <g className="com.sun.star.drawing.ClosedBezierShape">
                    <g id="id6">
                      <rect
                        className="BoundingBox"
                        stroke="none"
                        fill="none"
                        x="454"
                        y="138"
                        width="695"
                        height="1044"
                      />
                      <path
                        fill="current"
                        stroke="current"
                        strokeWidth="43"
                        strokeLinejoin="round"
                        strokeLinecap="round"
                        d="M 765,160 C 741,264 625,239 521,252 604,285 751,276 765,368 L 782,490 C 727,525 634,479 557,468 557,473 808,574 810,575 835,587 888,766 824,844 709,904 590,841 476,836 583,865 738,893 747,921 759,1013 771,1087 782,1159 787,1078 775,991 837,929 984,902 987,926 1063,936 991,909 951,846 927,768 908,661 932,658 946,629 1027,605 1067,652 1126,660 1050,622 963,575 901,521 828,459 927,391 1000,329 911,305 818,302 765,160 Z"
                      />
                    </g>
                  </g>
                  <g className="com.sun.star.drawing.OpenBezierShape">
                    <g id="id7">
                      <rect
                        className="BoundingBox"
                        stroke="none"
                        fill="none"
                        x="233"
                        y="311"
                        width="162"
                        height="803"
                      />
                      <path
                        fill="current"
                        stroke="current"
                        strokeWidth="43"
                        strokeLinejoin="round"
                        strokeLinecap="round"
                        d="M 332,333 C 212,452 238,978 372,1091"
                      />
                    </g>
                  </g>
                </g>
              </g>
            </g>
          </g>
        </g>
      </g>
    </svg>
    // </div>
    // {badges.length !== 0 && (
    //   <div
    //     className={`absolute ${rotation} top-[3mm] -left-[8.5mm]  w-[32px]  flex gap-1 flex-wrap  items-center invisible  group-hover:visible  `}
    //   >
    //     {children}
    //   </div>
    // )}
    // </div>
  );
}

export default Tooth8;
