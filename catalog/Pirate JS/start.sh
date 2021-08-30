#!/bin/sh
while true
do
{
            node app.js
			
			echo "Начинаю перезагружать бота,"
			echo "осталось:"
			for i in 2 1
			do
			echo "$i..."
			sleep 1
			done
			echo "Бот перезапущен."
}
done 