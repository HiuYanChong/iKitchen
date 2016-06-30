package test1;

import com.thoughtworks.selenium.*;
import org.junit.After;
import org.junit.Before;
import org.junit.Test;
import static org.junit.Assert.*;
import java.util.regex.Pattern;

public class test_server extends SeleneseTestCase {
	private Selenium selenium;

	@Before
	public void setUp() throws Exception {
		//selenium = new DefaultSelenium("localhost", 4444, "*firefox", "http://localhost:9000/");
		selenium = new DefaultSelenium("localhost", 4444, "*googlechrome", "http://localhost:9000/");
		selenium.start();
	}

	@Test
	public void testTest_server() throws Exception {
		selenium.open("/");
		selenium.type("id=name", "test_server");
		selenium.type("id=password", "test_server");
		selenium.click("css=button.btn.btn-default");
		selenium.waitForPageToLoad("30000");
		selenium.click("css=a.btn.btn-default");
		selenium.waitForPageToLoad("30000");
		selenium.click("xpath=(//input[@name='dish-check'])[3]");
		selenium.type("xpath=(//input[@name='order-count'])[3]", "1");
		selenium.click("//button[@type='submit']");
		assertEquals("点菜成功", selenium.getAlert());
		selenium.click("xpath=(//input[@name='dish-check'])[2]");
		selenium.click("xpath=(//input[@name='dish-check'])[3]");
		selenium.type("xpath=(//input[@name='order-count'])[2]", "2");
		selenium.type("xpath=(//input[@name='order-count'])[3]", "1");
		selenium.click("//button[@type='submit']");
		assertEquals("点菜成功", selenium.getAlert());
		selenium.click("link=首页");
		selenium.waitForPageToLoad("30000");
		selenium.click("link=选项");
		selenium.click("link=点单");
		selenium.waitForPageToLoad("30000");
		selenium.click("link=选项");
		selenium.click("link=登出");
		selenium.waitForPageToLoad("30000");
	}

	@After
	public void tearDown() throws Exception {
		selenium.stop();
	}
}

