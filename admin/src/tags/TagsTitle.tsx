import React from "react";
import { Link } from "react-router-dom";
import { AxiosError } from "axios";
import { useQuery } from "react-query";
import { api } from "../api";
import { Tags } from "../api/tags/Tags";

type Props = { id: string };

export const TagsTitle = ({ id }: Props) => {
  const { data, isLoading, isError, error } = useQuery<
    Tags,
    AxiosError,
    [string, string]
  >(["get-/api/tags", id], async (key: string, id: string) => {
    const response = await api.get(`${"/api/tags"}/${id}`);
    return response.data;
  });

  if (isLoading) {
    return <span>Loading...</span>;
  }

  if (isError) {
    return <span>Error: {error?.message}</span>;
  }

  return (
    <Link to={`${"/api/tags"}/${id}`} className="entity-id">
      {data?.Name && data?.Name.length ? data.Name : data?.id}
    </Link>
  );
};
