import React, { useMemo } from "react";
import { AxiosError } from "axios";
import { useQuery } from "react-query";
import { api } from "../api";
import { SelectField, SelectFieldProps } from "@amplication/design-system";
import { Tags } from "../api/tags/Tags";

type Data = Tags[];

type Props = Omit<SelectFieldProps, "options">;

export const TagsSelect = (props: Props) => {
  const { data } = useQuery<Data, AxiosError>("select-/api/tags", async () => {
    const response = await api.get("/api/tags");
    return response.data;
  });

  const options = useMemo(() => {
    return data
      ? data.map((item) => ({
          value: item.id,
          label: item.Name && item.Name.length ? item.Name : item.id,
        }))
      : [];
  }, [data]);

  return <SelectField {...props} options={options} />;
};
