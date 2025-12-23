use plant_maintenance;

CREATE TABLE work_orders (
  id INT AUTO_INCREMENT PRIMARY KEY,
  work_order_no VARCHAR(50) NOT NULL UNIQUE,
  notification_id VARCHAR(50) NOT NULL,
  operations TEXT NOT NULL,
  num_people INT NOT NULL,
  duration VARCHAR(50) NOT NULL,
  start_datetime DATETIME,
  end_datetime DATETIME,
  status VARCHAR(50) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);
