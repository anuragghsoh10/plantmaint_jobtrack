use plant_maintenance;

CREATE TABLE notifications (
  id INT AUTO_INCREMENT PRIMARY KEY,
  notification_no VARCHAR(50) NOT NULL UNIQUE,
  functional_location VARCHAR(255) NOT NULL,
  equipment VARCHAR(255) NOT NULL,
  description TEXT NOT NULL,
  damage_code VARCHAR(50) NOT NULL,
  effect VARCHAR(255) NOT NULL,
  created_by INT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (created_by) REFERENCES users(id)
);
