from wsgiref.simple_server import make_server
from pyramid.config import Configurator
from sqlalchemy import create_engine
from matakuliah_app.models import DBSession, Base
from matakuliah_app.views import MatakuliahViews

def _configure_database(sqlite_url='sqlite:///matakuliah.db'):
    engine = create_engine(sqlite_url)
    DBSession.configure(bind=engine)
    Base.metadata.bind = engine
    return engine

def _register_routes(cfg):
    routes = [
        ('get_all_matakuliah', '/api/matakuliah', 'GET'),
        ('create_matakuliah', '/api/matakuliah', 'POST'),
        ('get_matakuliah', '/api/matakuliah/{id}', 'GET'),
        ('update_matakuliah', '/api/matakuliah/{id}', 'PUT'),
        ('delete_matakuliah', '/api/matakuliah/{id}', 'DELETE'),
    ]
    for name, path, method in routes:
        cfg.add_route(name, path, request_method=method)

def main():
    # prepare database connection and bindings
    engine = _configure_database()

    # prepare pyramid configurator and routes
    config = Configurator()
    _register_routes(config)

    # discover view callables
    config.scan('matakuliah_app.views')

    # build WSGI application
    app = config.make_wsgi_app()
    return app

if __name__ == '__main__':
    app = main()
    server = make_server('0.0.0.0', 6543, app)
    print("✅ Server berjalan di http://localhost:6543")
    print("📚 API tersedia di:")
    print("   GET    http://localhost:6543/api/matakuliah")
    print("   POST   http://localhost:6543/api/matakuliah") 
    print("   GET    http://localhost:6543/api/matakuliah/1")
    print("   PUT    http://localhost:6543/api/matakuliah/1")
    print("   DELETE http://localhost:6543/api/matakuliah/1")
    print("\nTekan Ctrl+C untuk menghentikan server")
    server.serve_forever()