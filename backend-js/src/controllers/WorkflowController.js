import mongoose, { Document } from "mongoose";
import multer from "multer";
import Papa from "papaparse";

const postURL = process.env.postURL;
import { WorkflowSchema } from "../schemas/WorkflowSchema.js";
import nodes from "../nodefunctions/nodeFunctions.js";

const workflowSchema = WorkflowSchema;

const WorkflowModel = mongoose.model("Workflow", workflowSchema);

export const executeWorkflow = async (id, file) => {
  const workflow = await WorkflowModel.findById(id);
  let results = { file };
  if (workflow) {
    for (const node of workflow.nodes) {
      console.log(nodes[node["functionName"]]);
      results = await nodes[node["functionName"]](results);
      console.log(results);
    }
  }
  return "executed workflow";
};
