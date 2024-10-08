# Generated by Django 5.1 on 2024-09-01 18:56

import cloudinary_storage.storage
from django.db import migrations, models


class Migration(migrations.Migration):
    dependencies = [
        ("base", "0001_initial"),
    ]

    operations = [
        migrations.AlterField(
            model_name="product",
            name="image",
            field=models.ImageField(
                storage=cloudinary_storage.storage.MediaCloudinaryStorage(),
                upload_to="images",
            ),
        ),
    ]
