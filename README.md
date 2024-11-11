# Miners Online auth server

## Development instructions:

1. **Set Up the Environment:**
   - Ensure you have Python installed (preferably version 3.8 or higher). We recommend to use the Conda / Mini Conda package manager for this.
   - It’s recommended to create a virtual environment to keep dependencies isolated. Run the following command:
     ```bash
     python -m venv venv
     ```
   - Activate the virtual environment:
     - On Windows: `venv\Scripts\activate`
     - On macOS/Linux: `source venv/bin/activate`

2. **Install Dependencies:**
   - Install the required dependencies specified in your `requirements.txt` file by running:
     ```bash
     pip install -r requirements.txt
     ```

3. **Set Up Database Configuration:**
   - Ensure your database settings are configured in `settings.py`. If you're using a local database (like SQLite), it should work out of the box. For other databases, ensure you have the correct settings and any necessary database drivers installed.

4. **Apply Migrations:**
   - Run migrations to set up the database schema:
     ```bash
     python manage.py migrate
     ```

5. **Create a Superuser (Optional):**
   - If you want to access the Django admin interface, create a superuser by running:
     ```bash
     python manage.py createsuperuser
     ```

6. **Run the Development Server:**
   - Start the Django development server with:
     ```bash
     python manage.py runserver
     ```
   - By default, the server runs at `http://127.0.0.1:8000`. Open this URL in your browser to view your project.

7. **Access the Django Admin (Optional):**
   - If you created a superuser, you can access the Django admin interface at `http://127.0.0.1:8000/admin`.
