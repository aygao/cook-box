"""empty message

Revision ID: 637f324262c0
Revises: 0bad3f37c085
Create Date: 2019-11-07 13:15:43.330931

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '637f324262c0'
down_revision = '0bad3f37c085'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.alter_column('users', 'password',
               existing_type=sa.VARCHAR(length=255),
               nullable=False,
               schema='cbschema')
    op.alter_column('users', 'username',
               existing_type=sa.VARCHAR(length=70),
               nullable=False,
               schema='cbschema')
    op.create_unique_constraint(None, 'users', ['username'], schema='cbschema')
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_constraint(None, 'users', schema='cbschema', type_='unique')
    op.alter_column('users', 'username',
               existing_type=sa.VARCHAR(length=70),
               nullable=True,
               schema='cbschema')
    op.alter_column('users', 'password',
               existing_type=sa.VARCHAR(length=255),
               nullable=True,
               schema='cbschema')
    # ### end Alembic commands ###
