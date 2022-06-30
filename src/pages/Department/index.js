import { useState } from "react";
import { toast } from "react-toastify";
import { Button, Form } from "react-bootstrap";

import Page from "../../components/Page";
import ListView from "../../components/ListView";
import Modal from "../../components/Modal";

import api from "../../services/axios";

const endpoint = "/departments";

const columns = [
  { value: "ID", id: "id" },
  { value: "Name", id: "name" },
];

const INITIAL_STATE = { id: 0, name: "" };

const Department = () => {
  const [visible, setVisible] = useState(false);
  const [department, setDepartment] = useState(INITIAL_STATE);

  const handleSave = async (refetch) => {
    try {
      if (department.id) {
        await api.put(`${endpoint}/${department.id}`, {
          name: department.name,
        });

        toast.success("Atualizado com sucesso!");
      } else {
        await api.post(endpoint, { name: department.name });

        toast.success("O Departamento foi cadastrado com sucesso!");
      }

      setVisible(false);

      await refetch();
    } catch (error) {
      toast.error(error.message);
    }
  };

  const handleClose = () => setVisible(false);

  const actions = [
    {
      name: "Edit",
      action: (_department) => {
        setDepartment(_department);
        setVisible(true);
      },
    },
    {
      name: "Remove",
      action: async (item, refetch) => {
        if (
          window.confirm(
            "Você tem certeza de que quer deletar este departamento?"
          )
        ) {
          try {
            await api.delete(`${endpoint}/${item.id}`);
            await refetch();
            toast.info(`Departamento ${item.name} foi removido!`);
          } catch (error) {
            toast.info(error.message);
          }
        }
      },
    },
  ];

  return (
    <Page title="Departments">
      <Button
        className="mb-2"
        onClick={() => {
          setDepartment(INITIAL_STATE);
          setVisible(true);
        }}
      >
        Create Department
      </Button>

      <ListView actions={actions} columns={columns} endpoint={endpoint}>
        {({ refetch }) => {
          return (
            <Modal
              title={`${department.id ? "Update" : "Create"} Department`}
              show={visible}
              handleSave={() => handleSave(refetch)}
              handleClose={() => setVisible(false)}
            >
              <Form>
                <Form.Group>
                  <Form.Label>Department Name</Form.Label>
                  <Form.Control
                    name="department"
                    onChange={(event) =>
                      setDepartment({ ...department, name: event.target.value })
                    }
                    value={department.name}
                  />
                </Form.Group>
              </Form>
            </Modal>
          );
        }}
      </ListView>
    </Page>
  );
};

export default Department;
