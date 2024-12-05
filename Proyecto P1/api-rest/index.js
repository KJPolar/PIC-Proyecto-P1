import express from "express";
import bodyParser from "body-parser";
import mysql from "mysql2";
import cors from "cors";

const app = express();
const port = 8000;

app.use(cors());
app.use(bodyParser.json());

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  port: 3306,
  database: "SistemaGestionProyectos",
});

db.connect((error) => {
  if (error) {
    console.log("Error al conectar a la base de datos");
    return;
  } else {
    console.log("Conexión exitosa a la base de datos");
  }
});

app.get("/empleados/", (req, res) => {
  const query = "SELECT * FROM Empleados";
  db.query(query, (error, results) => {
    if (error) {
      res.status(500).json({ message: "Error al ejecutar la consulta" });
      return;
    } else {
      res.status(200).json(results);
    }
  });
});

app.get("/empleados/:id", (req, res) => {
  const { id } = req.params;
  const query = "SELECT * FROM Empleados WHERE id_empleado = ?";
  db.query(query, [id], (error, results) => {
    if (error) {
      res.status(500).json({ message: "Error al ejecutar la consulta" });
      return;
    }
    if (results.length === 0) {
      res.status(404).json({ message: "Empleado no encontrado" });
      return;
    }
    res.status(200).json(results[0]);
  });
});

app.post("/empleados/", (req, res) => {
  const { nombre, puesto, salario } = req.body;
  const query =
    "INSERT INTO Empleados (nombre, puesto, salario) VALUES(?, ?, ?)";
  db.query(query, [nombre, puesto, salario], (error, results) => {
    if (error) {
      res.status(500).json({ message: "Error al ejecutar la consulta" });
      return;
    } else {
      res.status(201).json({ message: "Empleado registrado exitosamente" });
    }
  });
});

app.delete("/empleados/:id", (req, res) => {
  const { id } = req.params;
  const query = "DELETE FROM Empleados WHERE id_empleado=?";
  db.query(query, [id], (error, results) => {
    if (error) {
      res.status(500).json({ message: "Error al eliminar el empleado" });
      return;
    }
    if (results.affectedRows === 0) {
      res.status(404).json({ message: "No existe el empleado" });
      return;
    }
    res.status(200).json({ message: "Empleado eliminado exitosamente" });
  });
});

app.put("/empleados/:id", (req, res) => {
  const { id } = req.params;
  const { nombre, puesto, salario } = req.body;
  const query =
    "UPDATE Empleados SET nombre=?, puesto=?, salario=? WHERE id_empleado=?";
  db.query(query, [nombre, puesto, salario, id], (error, results) => {
    if (error) {
      res.status(500).json({ message: "Error al actualizar el empleado" });
      return;
    }
    if (results.affectedRows === 0) {
      res.status(404).json({ message: "No existe el empleado" });
      return;
    }
    res.status(200).json({ message: "Empleado actualizado exitosamente" });
  });
});

app.get("/proyectos/", (req, res) => {
  const query = "SELECT * FROM Proyectos";
  db.query(query, (error, results) => {
    if (error) {
      res.status(500).json({ message: "Error al ejecutar la consulta" });
      return;
    }
    res.status(200).json(results);
  });
});

app.get("/proyectos/:id", (req, res) => {
  const { id } = req.params;
  const query = "SELECT * FROM Proyectos WHERE id_proyecto = ?";
  db.query(query, [id], (error, results) => {
    if (error) {
      res.status(500).json({ message: "Error al ejecutar la consulta" });
      return;
    }
    if (results.length === 0) {
      res.status(404).json({ message: "Proyecto no encontrado" });
      return;
    }
    res.status(200).json(results[0]);
  });
});

app.post("/proyectos/", (req, res) => {
  const { nombre_proyecto, fecha_inicio, fecha_fin } = req.body;
  const query =
    "INSERT INTO Proyectos (nombre_proyecto, fecha_inicio, fecha_fin) VALUES(?, ?, ?)";
  db.query(
    query,
    [nombre_proyecto, fecha_inicio, fecha_fin],
    (error, results) => {
      if (error) {
        res.status(500).json({ message: "Error al ejecutar la consulta" });
        return;
      }
      res.status(201).json({ message: "Proyecto registrado exitosamente" });
    }
  );
});

app.delete("/proyectos/:id", (req, res) => {
  const { id } = req.params;
  const query = "DELETE FROM Proyectos WHERE id_proyecto=?";
  db.query(query, [id], (error, results) => {
    if (error) {
      res.status(500).json({ message: "Error al eliminar el proyecto" });
      return;
    }
    if (results.affectedRows === 0) {
      res.status(404).json({ message: "No existe el proyecto" });
      return;
    }
    res.status(200).json({ message: "Proyecto eliminado exitosamente" });
  });
});

app.put("/proyectos/:id", (req, res) => {
  const { id } = req.params;
  const { nombre_proyecto, fecha_inicio, fecha_fin } = req.body;
  const query =
    "UPDATE Proyectos SET nombre_proyecto=?, fecha_inicio=?, fecha_fin=? WHERE id_proyecto=?";
  db.query(
    query,
    [nombre_proyecto, fecha_inicio, fecha_fin, id],
    (error, results) => {
      if (error) {
        res.status(500).json({ message: "Error al actualizar el proyecto" });
        return;
      }
      if (results.affectedRows === 0) {
        res.status(404).json({ message: "No existe el proyecto" });
        return;
      }
      res.status(200).json({ message: "Proyecto actualizado exitosamente" });
    }
  );
});

app.get('/participaciones/', (req, res) => {
    const query = `
        SELECT p.id_empleado, e.nombre AS nombre_empleado, pr.nombre_proyecto, p.rol
        FROM Participaciones p
        JOIN Empleados e ON p.id_empleado = e.id_empleado
        JOIN Proyectos pr ON p.id_proyecto = pr.id_proyecto
    `;
    
    console.log("Consulta SQL:", query);

    db.query(query, (error, results) => {
        if (error) {
            console.error("Error en la consulta:", error);
            res.status(500).json({ message: 'Error al ejecutar la consulta' });
            return;
        }
        res.status(200).json(results);
    });
});

