import * as React from "react";
import { Switch } from "react-router-dom";
import PrivateRoute from "../components/PrivateRoute";
import useBreadcrumbs from "../components/breadcrumbs/use-breadcrumbs";
import { TagsList } from "./TagsList";
import { CreateTags } from "./CreateTags";
import { Tags } from "./Tags";

export const TagsIndex = (): React.ReactElement => {
  useBreadcrumbs("/tags/", "Tags");

  return (
    <Switch>
      <PrivateRoute exact path={"/tags/"} component={TagsList} />
      <PrivateRoute path={"/tags/new"} component={CreateTags} />
      <PrivateRoute path={"/tags/:id"} component={Tags} />
    </Switch>
  );
};
