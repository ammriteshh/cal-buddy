import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useState } from "react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { Plus, Trash2 } from "lucide-react";
import { Label } from "../ui/label";
import { Textarea } from "../ui/textarea";

interface TasksComponentProps {
  newTask: string;
  addTask: (task: string, priority: "low" | "medium" | "high") => void;
  newTaskPriority: "low" | "medium" | "high";
  setNewTask: (task: string) => void;
  setNewTaskPriority: (priority: "low" | "medium" | "high") => void;
  taskFilter: "all" | "active" | "completed";
  setTaskFilter: (filter: "all" | "active" | "completed") => void;
  filteredTasks: {
    id: string;
    title: string;
    priority: "low" | "medium" | "high";
    completed: boolean;
  }[];
  toggleTaskCompletion: (id: string) => void;
  deleteTask: (id: string) => void;
}

export default function TasksComponent({
  newTask,
  addTask,
  newTaskPriority,
  setNewTask,
  setNewTaskPriority,
  taskFilter,
  setTaskFilter,
  filteredTasks,
  toggleTaskCompletion,
  deleteTask,
}: TasksComponentProps) {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleAddTask = () => {
    addTask(newTask, newTaskPriority);
    setIsDialogOpen(false);
    setNewTask("");
    setNewTaskPriority("medium");
  };

  return (
    <Card className="col-span-1 md:col-span-2 dark:border-none">
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle>Tasks</CardTitle>
          <CardDescription>Your to-do list</CardDescription>
        </div>
        <div className="flex flex-row items-center justify-between gap-4">
          <Select value={taskFilter} onValueChange={setTaskFilter}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Filter tasks" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Tasks</SelectItem>
              <SelectItem value="active">Active Tasks</SelectItem>
              <SelectItem value="completed">Completed Tasks</SelectItem>
            </SelectContent>
          </Select>
          <AlertDialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <AlertDialogTrigger asChild>
              <Button variant="outline">
                <Plus className="h-4 w-4" />
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Add New Task</AlertDialogTitle>
                <p className="text-muted-foreground text-sm">
                  Please fill out the following fields to add a new task to your
                  to-do list.
                </p>
                <AlertDialogDescription>
                  <div className="space-y-4 mt-4">
                    <Label
                      htmlFor="task-description"
                      className="text-foreground font-semibold"
                    >
                      Task Description
                    </Label>
                    <Textarea
                      placeholder="Enter task description"
                      value={newTask}
                      onChange={(e) => setNewTask(e.target.value)}
                      className="w-full"
                    />
                    <div className="flex flex-row items-center justify-start gap-4">
                      <Label
                        htmlFor="task-priority"
                        className="text-foreground font-semibold"
                      >
                        Priority:
                      </Label>
                      <Select
                        value={newTaskPriority}
                        onValueChange={(value: "low" | "medium" | "high") =>
                          setNewTaskPriority(value)
                        }
                      >
                        <SelectTrigger className="w-fit text-foreground w-full max-w-[100px]">
                          <SelectValue placeholder="Priority" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="low">Low</SelectItem>
                          <SelectItem value="medium">Medium</SelectItem>
                          <SelectItem value="high">High</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction
                  onClick={handleAddTask}
                  disabled={!newTask.trim()}
                >
                  Add
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex justify-between items-center"></div>
          <ul className="space-y-2">
            {filteredTasks.length === 0 ? (
              <div className="flex flex-col items-center justify-center text-muted-foreground mt-12 text-sm">
                Oh so empty...
              </div>
            ) : (
              filteredTasks.map((task) => (
                <li
                  key={task.id}
                  className="flex items-center justify-between p-2 bg-gray-50 dark:bg-gray-800 rounded-lg"
                >
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      checked={task.completed}
                      onCheckedChange={() => toggleTaskCompletion(task.id)}
                    />
                    <span
                      className={
                        task.completed
                          ? "line-through text-sm text-muted-foreground"
                          : "text-sm"
                      }
                    >
                      {task.title}
                    </span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Badge
                      variant={
                        task.priority === "high"
                          ? "destructive"
                          : task.priority === "medium"
                            ? "default"
                            : "secondary"
                      }
                    >
                      {task.priority}
                    </Badge>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => deleteTask(task.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </li>
              ))
            )}
          </ul>
        </div>
      </CardContent>
    </Card>
  );
}
