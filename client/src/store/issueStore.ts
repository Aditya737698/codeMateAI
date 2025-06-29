// src/store/issueStore.ts
import { create } from "zustand";

type Issue = {
  title: string;
  description: string;
  status: "open" | "in-progress" | "closed";
};

type IssueStore = {
  issues: Issue[];
  addIssue: (issue: Issue) => void;
};

export const useIssueStore = create<IssueStore>((set) => ({
  issues: [],
  addIssue: (issue) => set((state) => ({ issues: [...state.issues, issue] })),
}));