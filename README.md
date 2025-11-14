# Rei's ERP - Enterprise Resource Planning System

![Rei's ERP Dashboard Preview](/public/images/dashboard.webp "Dashboard Preview")

Rei's ERP is a comprehensive enterprise resource planning system designed to help businesses manage their sales, inventory, customer relationships, and business analytics in one integrated platform. Built with modern web technologies, it provides an intuitive interface with powerful features for small to medium-sized businesses.

Live Demo: [https://erp.reishandy.my.id](https://erp.reishandy.my.id) (WARNING!! This is very slow)

## Features

### Core Modules

1. **Dashboard**
    - Real-time business analytics and performance metrics
    - Revenue, sales, customer, and product trend visualizations
    - Top products and customers identification
    - Low stock alerts and recent sales activity

2. **Sales Management**
    - Complete sales transaction lifecycle management
    - Product stock validation during sales
    - Sales status tracking (Pending, Processing, Completed)
    - Automatic stock adjustment on sales updates/cancellations

3. **Inventory Management**
    - Product catalog with images and detailed descriptions
    - Stock level tracking with visual indicators
    - Sales performance metrics per product
    - Low stock alerts and warnings

4. **Customer Relationship Management**
    - Centralized customer database with contact details
    - Customer categorization (Individual/Business)
    - Sales history tracking per customer
    - Customer avatars and identification system

### Dashboard
![Dashboard Page](/public/images/dashboard.webp "Dashboard")

- View monthly revenue, sales, customer, and product metrics
- Identify top-performing products and customers
- Monitor recent sales and low-stock alerts
- Analyze business trends through interactive charts

### Sales Management
![Sales Page](/public/images/sales.webp "Sales Management")

- Create new sales transactions with product and customer selection
- Update sale quantities and status
- Track sales history with detailed information
- Export sales data to CSV format

### Inventory Management
![Products Page](/public/images/products.webp "Inventory Management")

- Add new products with images and descriptions
- Monitor stock levels with color-coded indicators
- Track sales performance per product
- Export product catalog to CSV

### Customer Management
![Customers Page](/public/images/products.webp "Customer Management")

- Maintain customer database with contact information
- Categorize customers as individuals or businesses
- Track sales history per customer
- Export customer data to CSV


### Additional Capabilities

- **Data Export**: Export sales, products, and customers to CSV
- **Responsive Design**: Works on desktop and mobile devices
- **Notification System**: Toast notifications for user actions
- **Data Visualization**: Interactive charts for business insights
- **Search & Filter**: Advanced data filtering across all modules

## Technology Stack

### Backend
- **PHP 8.2+** with **Laravel 12** framework
- **MySQL** database
- **Inertia.js** for server-client communication
- File storage with **Laravel Filesystem**

### Frontend
- **React 18** with **TypeScript**
- **Tailwind CSS** for styling
- **TanStack Table** for data tables
- **Shadcn UI** component library
- **Lucide Icons** for scalable vector icons
- **Zod** for form validation
- **Sonner** for toast notifications

### Development Tools
- **Vite** build tool
- **Ziggy** for Laravel route generation in JavaScript
- **ESLint** and **Prettier** for code quality

## Installation

### Prerequisites
- PHP 8.2+
- Composer
- Node.js 18+
- MySQL 8.0+

### Setup Instructions

1. Clone the repository:
   ```bash
   git clone https://github.com/Reishandy/Laravel-ERP
   cd Laravel-ERP
   ```

2. Install PHP dependencies:
   ```bash
   composer install
   ```

3. Install JavaScript dependencies:
   ```bash
   npm install
   ```

4. Create environment file:
   ```bash
   cp .env.example .env
   ```

5. Generate application key:
   ```bash
   php artisan key:generate
   ```

6. Configure database settings in `.env`:
   ```env
   DB_CONNECTION=mysql
   DB_HOST=127.0.0.1
   DB_PORT=3306
   DB_DATABASE=erp_system
   DB_USERNAME=root
   DB_PASSWORD=
   ```
> Adjust other .env settings as needed, such as APP_URL and MAIL configurations.

7. Run database migrations:
   ```bash
   php artisan migrate
   ```

8. Build frontend assets:
   ```bash
   npm run build
   ```

9. Start development server:
   ```bash
   php artisan serve
   ```
   
## License

Rei's ERP is open-source software licensed under the [GNU Affero General Public License v3.0](LICENSE).

## Author

Created by: **Reishandy**
- GitHub: [https://github.com/Reishandy](https://github.com/Reishandy)
- Website: [https://reishandy.my.id](https://reishandy.my.id)

---
