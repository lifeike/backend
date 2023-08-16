import express, { Express, Request, Response } from "express"
export type SearchParams = {
  search: string
  role: string
  status: string
  sortBy: string
  perPage: number
  pageNo: number
}
export type RequestParams = Request<null, null, null, SearchParams>
