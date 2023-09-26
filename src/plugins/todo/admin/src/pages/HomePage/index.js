/*
 *
 * HomePage
 *
 */

import React, { useState} from "react";

import {
  Layout,
  BaseHeaderLayout,
  ContentLayout,
} from "@strapi/design-system";


import { EmptyStateLayout } from "@strapi/design-system";
import { Button } from "@strapi/design-system";
import { Plus } from "@strapi/icons";
import { Illo } from "../../components/Illo";

import TodoModal from "../../components/TodoModal";

 

const HomePage = () => {

  const [todoData, setTodoData] = useState([]);
  const [showModal, setShowModal] = useState(false);

  async function addTodo(data) {
    setTodoData([...todoData, { ...data, id: nanoid(), isDone: false }]);
  }

  return (
    <Layout>
      <BaseHeaderLayout
        title="Todo Plugin"
        subtitle="All you todos in one place."
        as="h2"
      />
      <ContentLayout>
       {
        todoData.length  === 0 ? 
       (<EmptyStateLayout
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
      />):
        <p> Count and Table</p>
       }
      </ContentLayout>
      {
        showModal? (
          <TodoModal
           setShowModal={setShowModal}
           addTo ={addTodo}
          />
        ):""
      }
    </Layout>
  );
};

export default HomePage;
