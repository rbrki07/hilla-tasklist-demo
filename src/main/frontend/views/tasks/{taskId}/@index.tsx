import { ViewConfig } from '@vaadin/hilla-file-router/types.js';
import { AutoForm } from '@vaadin/hilla-react-crud';
import { useSignal } from '@vaadin/hilla-react-signals';
import { Button, Icon, VerticalLayout } from '@vaadin/react-components';
import Task from 'Frontend/generated/de/rwi/tasklist/Task';
import TaskModel from 'Frontend/generated/de/rwi/tasklist/TaskModel';
import { TaskService } from 'Frontend/generated/endpoints';
import { useCallback, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

export const config: ViewConfig = {
  menu: { exclude: true },
};

export default function TaskView() {
  const navigate = useNavigate();
  const { taskId } = useParams();
  const task = useSignal<Task>();

  useEffect(() => {
    const getTask = async (id: number) => {
      task.value = await TaskService.get(id);
    };
    if (taskId && taskId != 'new') {
      getTask(Number.parseInt(taskId));
    }
  }, [task, taskId]);

  const onSuccessCallback = useCallback(() => {
    navigate('/tasks');
  }, [navigate]);

  return (
    <VerticalLayout theme="margin">
      <Button aria-label="Navigate to previous view" theme="icon" onClick={() => navigate(`/tasks`)}>
        <Icon icon="lumo:arrow-left" />
      </Button>
      <AutoForm
        className="w-full"
        deleteButtonVisible={true}
        item={task.value}
        model={TaskModel}
        service={TaskService}
        onDeleteSuccess={onSuccessCallback}
        onSubmitSuccess={onSuccessCallback}
        fieldOptions={{
          createdAt: {
            readonly: true,
          },
          updatedAt: {
            readonly: true,
          },
        }}
      />
    </VerticalLayout>
  );
}
