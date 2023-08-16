import express, { Express, Request, Response } from "express"
export type RequestParams = Request<
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
