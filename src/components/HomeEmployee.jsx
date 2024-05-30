import React from "react";
import { useForm } from "react-hook-form";
import axios from "axios";


function Home() {
  const API_URL = 'http://localhost:9090/api/v1/user/create/peticion';

  const { register, formState: { errors }, handleSubmit } = useForm();

  const handleLogout = () => {
    window.location.href = '/';
  };

  const onSubmit = async (data) => {
    try {

      const formData = new FormData();
      Object.keys(data).forEach((key) => {
        formData.append(key, data[key]);
      });

      const files = document.getElementById('file').files;
      for (let i = 0; i < files.length; i++) {
        formData.append('files', files[i]);
      }

      const response = await axios.post(API_URL, formData, {
        headers: {
          'Content-Type': 'application/json'
        }
      });

      console.log('Response:', response.data);
      alert("Se creo el registro correctamente.");
    } catch (error) {
      console.error('Error sending data:', error);
      alert("No se creo el registro correctamente.");
    }
  };

  return (
    <div className="employee-form-container">
      <button className="logout-button" onClick={handleLogout}>Cerrar Sesión</button>
      <h1>Solicitud de registro en salud, caja de compensación o Pensiones</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="form-group">
          {errors.employeeName?.type === 'required' && (
            <p className="error-message">*Nombre es obligatorio.</p>
          )}
          <label htmlFor="employeeName">Nombre:</label>
          <input
            type="text"
            id="employeeName"
            {...register('employeeName', { required: true })}
          />
        </div>
        <div className="form-group">
          {errors.cargo?.type === 'required' && (
            <p className="error-message">*Cargo es obligatorio.</p>
          )}
          <label htmlFor="cargo">Cargo:</label>
          <input type="text" id="cargo" {...register('cargo', { required: true })} />
        </div>
        <div className="form-group">
          {errors.numeroDocumento?.type === 'required' && (
            <p className="error-message">*Número de documento es obligatorio.</p>
          )}
          <label htmlFor="documentNumber">Número de Documento:</label>
          <input
            type="text"
            id="documentNumber"
            {...register('documentNumber', { required: true })}
          />
        </div>
        <div className="form-group">
          <label htmlFor="type">Tipo de Solicitud:</label>
          <select id="type" {...register('type')}>
            <option value="caja_de_compensacion">Registro a Caja de Compensación</option>
            <option value="salud">Registro a Salud</option>
            <option value="pensiones">Registro a Pensiones</option>
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="file">Documentos:</label>
          <input type="file" id="file" multiple="multiple" />
        </div>
        <input type="submit" value="Enviar" className="submit-button" />
      </form>
    </div>
  );
}

export default Home;
