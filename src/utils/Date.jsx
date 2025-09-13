import { useEffect, useState } from "react";

export default function ClockHourly() {
  const [now, setNow] = useState(new Date());

  useEffect(() => {
    // อัปเดตทันทีรอบแรก
    setNow(new Date());

    // ตั้ง interval ให้รันทุก 1 ชั่วโมง (3600000 ms)
    const id = setInterval(() => {
      setNow(new Date());
    }, 3600000);

    return () => clearInterval(id);
  }, []);

  const text = now.toLocaleString("th-TH", {
    dateStyle: "full",
    timeZone: "Asia/Bangkok",
  });

  return <span>{text}</span>;
}
