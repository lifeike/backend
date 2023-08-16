import express, { Express, Request, Response } from "express"
export type SearchParams = Request<
  null,
  null,
  null,
  {
    search: string
    role: string
    status: string
    sortBy: string
    perPage: number
    pageNo: number
  }
>
