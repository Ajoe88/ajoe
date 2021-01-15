import * as React from "react";
import { useRouteMatch, useHistory } from "react-router-dom";
import { AxiosError } from "axios";
import { useQuery, useMutation } from "react-query";
import { Formik } from "formik";
import pick from "lodash.pick";

import {
  Form,
  EnumFormStyle,
  Button,
  FormHeader,
  Snackbar,
  EnumButtonStyle,
  TextField,
} from "@amplication/design-system";

import { api } from "../api";
import useBreadcrumbs from "../components/breadcrumbs/use-breadcrumbs";
import { Article as TArticle } from "../api/article/Article";
import { ArticleUpdateInput } from "../api/article/ArticleUpdateInput";

export const Article = (): React.ReactElement => {
  const match = useRouteMatch<{ id: string }>("/articles/:id/");
  const id = match?.params?.id;
  const history = useHistory();

  const { data, isLoading, isError, error } = useQuery<
    TArticle,
    AxiosError,
    [string, string]
  >(["get-/api/articles", id], async (key: string, id: string) => {
    const response = await api.get(`${"/api/articles"}/${id}`);
    return response.data;
  });

  const [deleteEntity] = useMutation<TArticle, AxiosError>(
    async (data) => {
      const response = await api.delete(`${"/api/articles"}/${id}`, data);
      return response.data;
    },
    {
      onSuccess: (data, variables) => {
        history.push("//articles");
      },
    }
  );

  const [
    update,
    { error: updateError, isError: updateIsError, isLoading: updateIsLoading },
  ] = useMutation<TArticle, AxiosError, ArticleUpdateInput>(async (data) => {
    const response = await api.patch(`${"/api/articles"}/${id}`, data);
    return response.data;
  });

  const handleSubmit = React.useCallback(
    (values: ArticleUpdateInput) => {
      void update(values);
    },
    [update]
  );

  useBreadcrumbs(match?.url, data?.Title);

  const handleDelete = React.useCallback(() => {
    void deleteEntity();
  }, [deleteEntity]);

  const errorMessage =
    updateError?.response?.data?.message || error?.response?.data?.message;

  const initialValues = React.useMemo(
    () => pick(data, ["Authors", "content", "Title"]),
    [data]
  );

  if (isLoading) {
    return <span>Loading...</span>;
  }

  return (
    <>
      {data && (
        <Formik initialValues={initialValues} onSubmit={handleSubmit}>
          <Form
            formStyle={EnumFormStyle.Horizontal}
            formHeaderContent={
              <FormHeader
                title={`${"Article"} ${
                  data?.Title && data?.Title.length ? data.Title : data?.id
                }`}
              >
                <Button
                  type="button"
                  disabled={updateIsLoading}
                  buttonStyle={EnumButtonStyle.Secondary}
                  icon="trash_2"
                  onClick={handleDelete}
                >
                  Delete
                </Button>
                <Button type="submit" disabled={updateIsLoading}>
                  Save
                </Button>
              </FormHeader>
            }
          >
            <div>
              <TextField label="Authors" name="Authors" />
            </div>
            <div>
              <TextField label="Content" name="content" textarea />
            </div>
            <div>
              <TextField label="Title" name="Title" />
            </div>
          </Form>
        </Formik>
      )}
      <Snackbar open={isError || updateIsError} message={errorMessage} />
    </>
  );
};
