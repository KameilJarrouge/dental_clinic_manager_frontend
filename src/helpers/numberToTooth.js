export default function numberToTooth(number) {
  let num = String(number);

  // list of teeth and badges coordinations
  let coords = [
    { tooth: "top-[0] left-[0px]", badge: "top-[12mm] left-[1mm] w-[20px]" }, // 1
    {
      tooth: "top-[3mm] left-[8.7mm]",
      badge: "top-[9.5mm] -left-[2.5mm] w-[20px]",
    }, // 2
    {
      tooth: "top-[9.1mm] left-[14.5mm]",
      badge: "top-[8mm] -left-[4mm]   w-[20px]",
    }, // 3
    {
      tooth: "top-[17.5mm] left-[18.5mm]",
      badge: "top-[3mm] -left-[9mm]  w-[32px]",
    }, // 4
    {
      tooth: "top-[29.7mm] left-[22.5mm]",
      badge: "top-[3mm] -left-[9mm]  w-[32px]",
    }, // 5
    {
      tooth: "top-[41.89mm] left-[23.5mm]",
      badge: "top-[3mm] -left-[9mm]  w-[32px]",
    }, // 6
    {
      tooth: "top-[57.64mm] left-[24mm]",
      badge: "top-[3mm] -left-[9mm]  w-[32px]",
    }, // 7
    {
      tooth: "top-[73.39mm] left-[24.5mm]",
      badge: "top-[3mm] -left-[9mm]  w-[32px]",
    }, // 8
  ];

  let isBabyTooth = false;

  // Tooth Number is exactly two digits
  if (num.length !== 2) {
    console.error(
      "numberToTooth_ERROR: given a number which doesn't consists of two digits. given:",
      num
    );
    return;
  }
  // split number into quarter and index
  let digit_1 = Number(num.charAt(0));
  let digit_2 = Number(num.charAt(1));

  // both digits are not larger than 8 ==> throw error
  if (digit_1 > 8 || digit_2 > 8) {
    console.error(
      "numberToTooth_ERROR: given a digit larger than 8. given:",
      num
    );
    return;
  }

  let rotation = "";
  // assume the index is correct
  let index = digit_2;

  if (digit_1 > 4) {
    digit_1 = digit_1 - 4;
    isBabyTooth = true;
    // correct index if they are baby teeth in order to map to the correct tooth svg
    if (digit_2 === 4) {
      index = 6;
    }
    if (digit_2 === 5) {
      index = 7;
    }
  }
  switch (digit_1) {
    case 1:
      // first quarter flip on the y axis
      rotation = "-scale-x-[1]";
      break;
    case 3:
      // third quarter flip on the x axis
      rotation = "-scale-y-[1]";
      break;
    case 4:
      // fourth quarter flip on the center of the axis
      rotation = "-scale-y-[1] -scale-x-[1]";
      break;
  }

  return {
    index: index,
    rotation: rotation,
    isBabyTooth: isBabyTooth,
    coords: coords[index - 1],
  };
}
