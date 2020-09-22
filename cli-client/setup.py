from setuptools import setup, find_packages

setup(
    name="energy_group56", 
    version="0.0.1",
    author="Touloumbes",
    description="A CLI for Watterloo.",
    url="https://github.com/ntua/TL19-56/cli-client",
    packages = find_packages(),
    install_requires=['click', 'requests','datetime', 'click_option_group'],
    entry_points={
        'console_scripts': [ 
            'energy_group56 = energy_group56.energy_group56:main'
        ]
    }
)
