import { Elysia, error, t } from "elysia";
import { opentelemetry } from '@elysiajs/opentelemetry';
import { swagger } from '@elysiajs/swagger';
import { note } from './note';
import { user } from './user'
import { html, Html } from '@elysiajs/html'
import staticPlugin from "@elysiajs/static";
import Home from "./components/Home";
import * as e from "./imports";

export const app = new Elysia();
app
  .use(opentelemetry()) 
  .use(swagger())
  .use(html())
  .use(staticPlugin())
  .use(e.getCounter)
  .listen(process.env.PORT || 3001,
    () => console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
  ))
;
