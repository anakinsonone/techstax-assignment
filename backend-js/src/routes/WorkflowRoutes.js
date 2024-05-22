import { Router } from "express";
import mongoose from "mongoose";
import multer from "multer";
import Papa from "papaparse";

import { WorkflowSchema } from "../schemas/WorkflowSchema.js";
import { executeWorkflow } from "../controllers/WorkflowController.js";
import { functionMap } from "../nodefunctions/nodefunctionsMap.js";

const workflowSchema = WorkflowSchema;
const upload = multer();

const WorkflowModel = mongoose.model("Workflow", workflowSchema);

export const WorkflowRouter = Router();

WorkflowRouter.get("/", async (req, res) => {
  const workflows = await WorkflowModel.find();

  res.send(workflows.map((flow) => flow._id));
});

// Endpoint for saving workflows
WorkflowRouter.post("/", async (req, res) => {
  const { flow } = req.body;

  flow.nodes = flow.nodes.map((node) => ({
    ...node,
    functionName: functionMap[node["type"]],
  }));

  const newWorkFlow = new WorkflowModel(flow);
  const result = await newWorkFlow.save();

  res.send("saved document");
});

WorkflowRouter.post("/run", upload.single("file"), async (req, res) => {
  const { id } = req.body;
  const file = req.file;
  const result = await executeWorkflow(id, file);

  res.send(result);
});
