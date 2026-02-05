# 📝 Sistema Lista de Tarefas (***TESTE***)

Sistema web para **cadastro, edição, exclusão e ordenação de tarefas**, desenvolvido conforme especificação fornecida, sem funcionalidades extras.

O objetivo do projeto é aplicar conceitos de **persistência de dados**, **CRUD**, **ordenação de registros** e **boas práticas básicas em PHP com MySQL**.

---

## 🚀 Tecnologias Utilizadas

- PHP 8+
- MySQL
- HTML5
- CSS
- JavaScript (vanilla)
- XAMPP (Apache + MySQL)

---

## 📊 Banco de Dados

### Estrutura da tabela `tarefas`

```sql
CREATE DATABASE lista_tarefas CHARACTER SET utf8mb4;
USE lista_tarefas;

CREATE TABLE tarefas (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(255) NOT NULL UNIQUE,
    custo DECIMAL(10,2) NOT NULL CHECK (custo >= 0),
    data_limite DATE NOT NULL,
    ordem INT NOT NULL UNIQUE
);
