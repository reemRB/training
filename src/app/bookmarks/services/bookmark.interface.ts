export type Bookmark = {
  id: number;
  title: string;
  url: string;
  body: string;
};

export interface DummyJsonPostsResponse {
  posts: Bookmark[];
  total: number;
  skip: number;
  limit: number;
}
