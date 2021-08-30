from kutana import Kutana, VKController, load_plugins, load_configuration


# Create engine
kutana = Kutana()

# Create VKController
kutana.add_controller(
    VKController(token = "Сюда напиши свой токен API")
)

# Load and register plugins
kutana.executor.register_plugins(*load_plugins("/root/bot/example/plugins"))

# Run engine
kutana.run()
