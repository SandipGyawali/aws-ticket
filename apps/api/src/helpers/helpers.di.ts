// dependency injection modules
import {
  autoInjectable,
  inject,
  injectAll,
  container,
  registry,
} from "tsyringe";
export { Service as Model, Container as Context } from "typedi";
export { Router } from "express";

export const Container = container;
export const Service = autoInjectable;
export const Controller = autoInjectable;
export const Injectable = autoInjectable;
export const Route = autoInjectable;
export const Inject = inject;
export const InjectAll = injectAll;
export const Module = registry;
