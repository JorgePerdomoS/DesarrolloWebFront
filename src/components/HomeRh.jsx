import React, { useState, useEffect } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import axios from "axios";

const API_URL = 'http://localhost:9090/api/v1/user/peticiones';

const getData = async () => {
  try {
    const response = await axios.get(API_URL);
    return response.data;
  } catch (error) {
    console.error('Error fetching data:', error);
    throw error;
  }
};

const handleLogout = () => {
  window.location.href = '/';
};

const MyDataTable = () => {

  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await getData();
        setData(result);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <button className="logout-button" onClick={handleLogout}>Cerrar Sesión</button>
      <h1>Solicitudes</h1>
      {loading ? (
        <p>Cargando...</p>
      ) : (
        <DataTable value={data} showGridlines paginator rows={5} rowsPerPageOptions={[5, 10, 25, 50]} tableStyle={{ minWidth: '50rem' }}>
          <Column field="id" header="# Solicitud" style={{ width: '25%' }}></Column>
          <Column field="employeeName" header="Nombre" style={{ width: '25%' }}></Column>
          <Column field="documentNumber" header="# Documento" style={{ width: '25%' }}></Column>
          <Column field="type" header="Tipo de solicitud" style={{ width: '25%' }}></Column>
          <Column field='documents' header="Documentos" body={(rowData) => <output type="file" id="file" multiple="multiple" />}></Column>
          <Column field='state' header="Estado" body={(rowData) => <select id="state">
            <option value="accepted">Aceptado</option>
            <option value="rejacted">Rechazado</option>
          </select>}></Column>
        </DataTable>
      )}
    </div>
  );
};

export default MyDataTable;
