export function HitungCurrTime(time: number) {
  let result;
  if (time >= 4 && time <= 12) {
    result = "Selamat Pagi";
  } else if (time >= 12 && time <= 15) {
    result = "Selamat Siang";
  } else if (time >= 15 && time <= 18) {
    result = "Selamat Sore";
  } else if (time >= 18) {
    result = "Selamat Malam";
  } else if (time <= 4) {
    result = "Selamat Malam";
  }
  return result;
}
