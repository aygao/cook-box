"""empty message

Revision ID: f84518187e1f
Revises: 96b642351564
Create Date: 2019-10-10 14:44:29.932949

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = 'f84518187e1f'
down_revision = '96b642351564'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('recipes',
    sa.Column('recipe_id', sa.BigInteger(), nullable=False),
    sa.Column('name', sa.String(length=255), nullable=False),
    sa.Column('user_id', sa.BigInteger(), nullable=False),
    sa.Column('description', sa.String(length=5000), nullable=True),
    sa.Column('tags', sa.ARRAY(sa.String(length=255)), nullable=True),
    sa.Column('create_dttm', sa.DateTime(), nullable=False),
    sa.Column('update_dttm', sa.DateTime(), nullable=True),
    sa.PrimaryKeyConstraint('recipe_id'),
    sa.UniqueConstraint('name'),
    schema='cbschema'
    )
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_table('recipes', schema='cbschema')
    # ### end Alembic commands ###
