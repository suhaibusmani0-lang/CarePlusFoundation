// @ts-check
import { module } from "@prisma/composer";
import carePlusFoundationService from "./service.mjs";

export default module("care-plus-foundation", ({ provision }) => {
  provision(carePlusFoundationService, { id: "careplusfoundation" });
});
