/*
 *
 * HomePage
 *
 */

import React, { useState , useEffect} from "react";
import { Loader } from "@strapi/design-system"
import { Layout, BaseHeaderLayout, ContentLayout } from "@strapi/design-system";

import todoRequests from "../../api/todo";

import { EmptyStateLayout } from "@strapi/design-system";
import { nanoid } from "nanoid";
import { Button } from "@strapi/design-system";
import { Plus } from "@strapi/icons";
import { Illo } from "../../components/Illo";

import TodoModal from "../../components/TodoModal";
import TodoCount from "../../components/TodoCount";
import TodoTable from "../../components/TodoTable";

const HomePage = () => {
  const [todoData, setTodoData] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const fetchData = async () => {
    if (isLoading === false) setIsLoading(true);

    try {
      const todo = await todoRequests.getAllTodos();
      setTodoData(todo);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const initFetchData = async () => {
      await fetchData();
    };

    initFetchData();
  }, []);

  async function addTodo(data) {
    setTodoData([...todoData, { ...data, id: nanoid(), isDone: false }]);
  }

  async function toggleTodo(data) {
    alert("Add Toggle Todo in API");
  }

  async function deleteTodo(data) {
    alert("Add Delete Todo in API");
  }

  async function editTodo(id, data) {
    alert("Add Edit Todo in API");
  }

  if( isLoading) {
  return (
    <Loader />
  )
}
  return (
    <Layout>
      <BaseHeaderLayout
        title="Todo Plugin"
        subtitle="All you todos in one place."
        as="h2"
      />
      <ContentLayout>
        {todoData.length === 0 ? (
          <EmptyStateLayout
            icon={<Illo />}
            content="You don't have any todos yet..."
            action={
              <Button
                onClick={() => setShowModal(true)}
                variant="secondary"
                startIcon={<Plus />}
              >
                Add your first todo
              </Button>
            }
          />
        ) : (
          <>
            <TodoCount count={todoData.length} />
            <TodoTable
              todoData={todoData}
              setShowModal={setShowModal}
              toggleTodo={toggleTodo}
              deleteTodo={deleteTodo}
              editTodo={editTodo}
            />
          </>
        )}
      </ContentLayout>
      {showModal ? (
        <TodoModal setShowModal={setShowModal} addTodo={addTodo} />
      ) : (
        ""
      )}
    </Layout>
  );
};

export default HomePage;
