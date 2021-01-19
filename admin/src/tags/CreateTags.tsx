import * as React from "react";
import { useMutation } from "react-query";
import { useHistory } from "react-router-dom";
import { AxiosError } from "axios";
import { Formik } from "formik";
import {
  Form,
  EnumFormStyle,
  Button,
  FormHeader,
  Snackbar,
  TextField,
} from "@amplication/design-system";
import { api } from "../api";
import useBreadcrumbs from "../components/breadcrumbs/use-breadcrumbs";
import { Tags } from "../api/tags/Tags";
import { TagsCreateInput } from "../api/tags/TagsCreateInput";

const INITIAL_VALUES = {} as TagsCreateInput;

export const CreateTags = (): React.ReactElement => {
  useBreadcrumbs("/tags/new", "Create Tags");
  const history = useHistory();

  const [create, { error, isError, isLoading }] = useMutation<
    Tags,
    AxiosError,
    TagsCreateInput
  >(
    async (data) => {
      const response = await api.post("/api/tags", data);
      return response.data;
    },
    {
      onSuccess: (data, variables) => {
        history.push(`${"/tags"}/${data.id}`);
      },
    }
  );
  const handleSubmit = React.useCallback(
    (values: TagsCreateInput) => {
      void create(values);
    },
    [create]
  );
  return (
    <>
      <Formik initialValues={INITIAL_VALUES} onSubmit={handleSubmit}>
        <Form
          formStyle={EnumFormStyle.Horizontal}
          formHeaderContent={
            <FormHeader title={"Create Tags"}>
              <Button type="submit" disabled={isLoading}>
                Save
              </Button>
            </FormHeader>
          }
        >
          <div>
            <TextField label="Name" name="Name" />
          </div>
        </Form>
      </Formik>
      <Snackbar open={isError} message={error?.response?.data?.message} />
    </>
  );
};
