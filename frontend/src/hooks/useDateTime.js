import { useState } from "react";
import useModifier from "./useModifier";

function useDateTime() {
   const [dateTime, setDateTime] = useState(new Date());

   setInterval(() => {
      setDateTime(new Date());
   }, 1000);

   let year = dateTime.getFullYear();
   let month = dateTime.getMonth();
   let date = dateTime.getDate();
   let hr = dateTime.getHours();
   let min = dateTime.getMinutes();

   let time = `${year}-${useModifier(Number(month) + 1)}-${useModifier(
      date
   )}T${useModifier(hr)}:${useModifier(min)}`;

   return { time };
}

export default useDateTime;
