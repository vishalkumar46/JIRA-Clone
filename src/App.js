import React from "react";
import Layout from "./components/Layout";
import TaskList from "./features/TaskList";
import { Routes, Route, Navigate } from "react-router-dom";
import Modal from "./components/Modal";

export const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<TaskList />} />

        <Route path="task">
          <Route path="edit/:taskId" element={<Modal />} />
        </Route>
        <Route path="*" element={<Navigate to="/" replace />} />
      </Route>
    </Routes>
  );
};
