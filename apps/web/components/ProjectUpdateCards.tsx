"use client";
import { getProjectUpdateData, ProjectUpdate } from "@/lib/getProjectUpdateData";
import { useEffect, useState } from "react";

export  function ProjectUpdateCards() {
  const [updateData, setUpdateData] = useState<ProjectUpdate[]>([]);

  useEffect(() => {
    if (process.env.NODE_ENV !== "production") return;

    const getData = async () => {
      const data = await getProjectUpdateData(5);
      setUpdateData(data);
    }

    getData();
  }, []);

  return (
    <div>
      {updateData.length !== 0 && (
        <p>UpdateData is not empty so it worked i guess...</p>
      )}
    </div>
  )
}